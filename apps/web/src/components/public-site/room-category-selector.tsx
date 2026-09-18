"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { motionTokens } from "@/lib/motion-tokens";
import { roomCategories } from "@/lib/public-site-data";

export function RoomCategorySelector() {
  const [activeId, setActiveId] = useState(roomCategories[0].id);
  const [selectionMessage, setSelectionMessage] = useState("");
  const reducedMotion = useReducedMotion();
  const activeIndex = roomCategories.findIndex((room) => room.id === activeId);
  const activeRoom = roomCategories[activeIndex];

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );
    if (category && roomCategories.some((room) => room.id === category)) {
      setActiveId(category);
    }
  }, []);

  function selectCategory(id: string) {
    setActiveId(id);
    setSelectionMessage("");

    const params = new URLSearchParams(window.location.search);
    params.set("category", id);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}${window.location.hash || "#rooms"}`,
    );
    window.dispatchEvent(new Event("booking-draft-change"));
  }

  function moveSelection(direction: -1 | 1) {
    const nextIndex =
      (activeIndex + direction + roomCategories.length) % roomCategories.length;
    selectCategory(roomCategories[nextIndex].id);
  }

  function chooseCategory() {
    setSelectionMessage(
      `${activeRoom.name} selected for this concept preview. The connected booking flow will preserve dates, guests and category through Google sign-in.`,
    );
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const params = new URLSearchParams(window.location.search);
    params.set("category", activeRoom.id);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}#booking-journey`,
    );
    window.dispatchEvent(new Event("booking-draft-change"));
    document
      .getElementById("booking-journey")
      ?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    document.getElementById("journey-title")?.focus({ preventScroll: true });
  }

  const transition = reducedMotion
    ? { duration: motionTokens.duration.fast }
    : {
        duration: motionTokens.duration.media,
        ease: motionTokens.easing.smooth,
      };

  return (
    <div className="category-selector">
      <fieldset className="category-tabs">
        <legend className="sr-only">Choose a sample room category</legend>
        {roomCategories.map((room, index) => (
          <label
            className={`category-tab ${room.id === activeId ? "is-active" : ""}`}
            key={room.id}
          >
            <input
              type="radio"
              name="room-category"
              value={room.id}
              checked={room.id === activeId}
              onChange={() => selectCategory(room.id)}
            />
            <span className="category-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{room.name}</span>
          </label>
        ))}
      </fieldset>

      <div className="category-stage">
        <div className="category-media">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              className="category-image-wrap"
              key={activeRoom.id}
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : motionTokens.distance.md,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: reducedMotion ? 0 : -motionTokens.distance.md,
              }}
              transition={transition}
            >
              <Image
                src={activeRoom.image}
                alt={activeRoom.alt}
                fill
                sizes="(max-width: 900px) 100vw, 62vw"
              />
              <a
                className="photo-credit"
                href={activeRoom.credit.href}
                target="_blank"
                rel="noreferrer"
              >
                Sample photo: {activeRoom.credit.name} / Pexels
              </a>
            </motion.div>
          </AnimatePresence>

          <div
            className="category-arrows"
            role="group"
            aria-label="Browse room categories"
          >
            <button
              type="button"
              onClick={() => moveSelection(-1)}
              aria-label="Show previous room category"
            >
              ←
            </button>
            <span aria-live="polite">
              {activeRoom.name}, category {activeIndex + 1} of{" "}
              {roomCategories.length}
            </span>
            <button
              type="button"
              onClick={() => moveSelection(1)}
              aria-label="Show next room category"
            >
              →
            </button>
          </div>
        </div>

        <AnimatePresence initial={false} mode="sync">
          <motion.div
            className="category-details"
            key={activeRoom.id}
            initial={{
              opacity: 0,
              y: reducedMotion ? 0 : motionTokens.distance.sm,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reducedMotion ? 0 : -motionTokens.distance.sm,
            }}
            transition={transition}
          >
            <p className="eyebrow">{activeRoom.eyebrow}</p>
            <h3>{activeRoom.name}</h3>
            <p className="category-description">{activeRoom.description}</p>

            <dl className="category-facts">
              <div>
                <dt>Capacity</dt>
                <dd>{activeRoom.capacity}</dd>
              </div>
              <div>
                <dt>Bed</dt>
                <dd>{activeRoom.bed}</dd>
              </div>
            </dl>

            <ul
              className="category-highlights"
              aria-label="Sample room highlights"
            >
              {activeRoom.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <div className="category-actions">
              <button
                className="primary-button"
                type="button"
                onClick={chooseCategory}
              >
                Continue with this category
              </button>
              <a className="text-link" href="#prototype-note">
                About sample content
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="selection-status" role="status" aria-live="polite">
        {selectionMessage}
      </p>
    </div>
  );
}
