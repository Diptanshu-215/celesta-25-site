"use client";

import { useState } from "react";

export default function EventModal({ event, onClose }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
            <div className="bg-neutral-900 text-white max-w-2xl w-full rounded-xl p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl"
                >
                    ✕
                </button>

                {!showForm ? (
                    <>
                        <img
                            src={event.img_src}
                            alt={event.name}
                            className="rounded-lg mb-4 w-full max-h-[45vh] object-contain"
                        />


                        <h2 className="text-3xl font-bold mb-2">{event.name}</h2>

                        <p className="text-neutral-300 mb-4">
                            {event.description}
                        </p>

                        <p className="mb-4">
                            <strong>Registration Fee:</strong> ₹{event.fee}
                        </p>

                        <div className="flex gap-4">
                            <a
                                href={event.rulebook}
                                target="_blank"
                                className="border px-4 py-2 rounded"
                            >
                                Rulebook
                            </a>

                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-white text-black px-4 py-2 rounded"
                            >
                                Register
                            </button>
                        </div>
                    </>
                ) : (
                    <RegisterForm event={event} />
                )}
            </div>
        </div>
    );
}

function RegisterForm({ event }) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">
                Register for {event.name}
            </h2>

            <form className="flex flex-col gap-3">
                <input placeholder="Name" className="p-2 rounded bg-neutral-800" />
                <input placeholder="College / Organisation" className="p-2 rounded bg-neutral-800" />
                <input placeholder="College ID (if any)" className="p-2 rounded bg-neutral-800" />
                <input placeholder="Aadhar Card Number" className="p-2 rounded bg-neutral-800" />
                <input placeholder="Team Name" className="p-2 rounded bg-neutral-800" />

                <button className="bg-white text-black py-2 rounded mt-2">
                    Submit
                </button>
            </form>
        </>
    );
}
