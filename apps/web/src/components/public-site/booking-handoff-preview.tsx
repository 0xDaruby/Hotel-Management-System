"use client";

import { useEffect, useState } from "react";

import { roomCategories } from "@/lib/public-site-data";

type BookingDraft = {
  category: string;
  dates: string;
};

const emptyDraft: BookingDraft = {
  category: "Choose a category",
  dates: "Set your dates",
};

function formatDates(arrival: string, departure: string) {
  if (!arrival || !departure) return emptyDraft.dates;

  const formatter = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
  });

  return `${formatter.format(new Date(`${arrival}T12:00:00`))}–${formatter.format(new Date(`${departure}T12:00:00`))}`;
}

function readBookingDraft(): BookingDraft {
  const params = new URLSearchParams(window.location.search);
  const category = roomCategories.find(
    (room) => room.id === params.get("category"),
  );

  return {
    category: category?.name ?? emptyDraft.category,
    dates: formatDates(
      params.get("arrival") ?? "",
      params.get("departure") ?? "",
    ),
  };
}

export function BookingHandoffPreview() {
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);

  useEffect(() => {
    const updateDraft = () => setDraft(readBookingDraft());
    updateDraft();
    window.addEventListener("booking-draft-change", updateDraft);
    window.addEventListener("popstate", updateDraft);

    return () => {
      window.removeEventListener("booking-draft-change", updateDraft);
      window.removeEventListener("popstate", updateDraft);
    };
  }, []);

  return (
    <div
      className="bridge-ticket"
      role="group"
      aria-label="Example booking handoff"
    >
      <div className="bridge-ticket-head">
        <span>My Stay</span>
        <span>Confirmed information only</span>
      </div>
      <div className="bridge-ticket-body">
        <p>Booked category</p>
        <strong>{draft.category}</strong>
        <dl>
          <div>
            <dt>Dates</dt>
            <dd>{draft.dates}</dd>
          </div>
          <div>
            <dt>Room number</dt>
            <dd>Issued on arrival</dd>
          </div>
        </dl>
        <span className="bridge-status">Your stay details, kept close</span>
      </div>
    </div>
  );
}
