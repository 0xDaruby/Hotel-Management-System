"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SearchSummary = {
  arrival: string;
  departure: string;
  guests: string;
};

function readableDate(value: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));
}

export function AvailabilitySearch() {
  const formRef = useRef<HTMLFormElement>(null);
  const [summary, setSummary] = useState<SearchSummary | null>(null);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"arrival" | "departure" | null>(
    null,
  );
  const [today, setToday] = useState("");
  const [arrivalConstraint, setArrivalConstraint] = useState("");

  useEffect(() => {
    const now = new Date();
    const localToday = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
    setToday(localToday);

    const form = formRef.current;
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const arrival = params.get("arrival") ?? "";
    const departure = params.get("departure") ?? "";
    const guests = params.get("guests") ?? "";
    if (!arrival || !departure || !guests) return;

    const arrivalInput = form.elements.namedItem("arrival");
    const departureInput = form.elements.namedItem("departure");
    const guestsSelect = form.elements.namedItem("guests");

    if (arrivalInput instanceof HTMLInputElement) {
      arrivalInput.value = arrival;
    }
    if (departureInput instanceof HTMLInputElement) {
      departureInput.value = departure;
    }
    if (guestsSelect instanceof HTMLSelectElement) {
      guestsSelect.value = guests;
    }

    setArrivalConstraint(arrival);
    setSummary({ arrival, departure, guests });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const arrival = String(data.get("arrival") ?? "");
    const departure = String(data.get("departure") ?? "");
    const guests = String(data.get("guests") ?? "");

    if (today && arrival < today) {
      setSummary(null);
      setError("Arrival cannot be in the past.");
      setErrorField("arrival");
      document.getElementById("arrival")?.focus();
      return;
    }

    if (departure <= arrival) {
      setSummary(null);
      setError("Departure must be after arrival.");
      setErrorField("departure");
      document.getElementById("departure")?.focus();
      return;
    }

    setError("");
    setErrorField(null);
    setSummary({ arrival, departure, guests });

    const params = new URLSearchParams(window.location.search);
    params.set("arrival", arrival);
    params.set("departure", departure);
    params.set("guests", guests);
    window.history.replaceState(null, "", `?${params.toString()}#rooms`);
    window.dispatchEvent(new Event("booking-draft-change"));
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById("rooms")
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    document.getElementById("rooms-title")?.focus({ preventScroll: true });
  }

  return (
    <div className="availability-shell" id="availability">
      <form
        ref={formRef}
        className="availability-form"
        onSubmit={handleSubmit}
        aria-describedby="availability-note"
      >
        <div className="field-group">
          <label htmlFor="arrival">Arrival</label>
          <input
            id="arrival"
            name="arrival"
            type="date"
            min={today || undefined}
            required
            aria-invalid={errorField === "arrival"}
            aria-describedby={
              errorField === "arrival" ? "availability-error" : undefined
            }
            onChange={(event) => setArrivalConstraint(event.target.value)}
          />
        </div>
        <div className="field-group">
          <label htmlFor="departure">Departure</label>
          <input
            id="departure"
            name="departure"
            type="date"
            min={arrivalConstraint || today || undefined}
            required
            aria-invalid={errorField === "departure"}
            aria-describedby={
              errorField === "departure" ? "availability-error" : undefined
            }
          />
        </div>
        <div className="field-group">
          <label htmlFor="guests">Guests</label>
          <select id="guests" name="guests" defaultValue="2" required>
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5+ guests</option>
          </select>
        </div>
        <button className="availability-submit" type="submit">
          Find a room
          <span aria-hidden="true">↗</span>
        </button>
      </form>

      {error ? (
        <p className="availability-error" id="availability-error" role="alert">
          {error}
        </p>
      ) : null}

      <p
        className="availability-note"
        id="availability-note"
        aria-live="polite"
      >
        {summary
          ? `Previewing sample categories for ${readableDate(summary.arrival)}–${readableDate(summary.departure)}, ${summary.guests} ${summary.guests === "1" ? "guest" : "guests"}. Live availability is not connected yet.`
          : "Explore without signing in. Live pricing and availability will come from the hotel system."}
      </p>
    </div>
  );
}
