"use client";

import { useState } from "react";
import styles from "./EventModal.module.css";

export default function EventModal({ event, onClose }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div className={`text-white max-w-2xl w-full p-6 relative ${styles.glassCard}`}>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl hover:text-red-400 transition-colors"
                >
                    ✕
                </button>

                {!showForm ? (
                    <>
                        <img
                            src={event.img_src}
                            alt={event.name}
                            className="rounded-lg mb-4 w-full max-h-[45vh] object-contain bg-black/20"
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
                                className="border border-white/30 px-4 py-2 rounded hover:bg-white/10 transition-colors"
                            >
                                Rulebook
                            </a>

                            <button
                                onClick={() => setShowForm(true)}
                                className={styles.btn}
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

            <form className="flex flex-col gap-4">
                <input placeholder="Name" className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-400 outline-none text-white placeholder-white/40 transition-colors" />
                <input placeholder="College / Organisation" className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-400 outline-none text-white placeholder-white/40 transition-colors" />
                <input placeholder="College ID (if any)" className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-400 outline-none text-white placeholder-white/40 transition-colors" />
                <input placeholder="Aadhar Card Number" className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-400 outline-none text-white placeholder-white/40 transition-colors" />
                <input placeholder="Team Name" className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-400 outline-none text-white placeholder-white/40 transition-colors" />

                <button className={`${styles.btn} mt-4`}>
                    Submit
                </button>
            </form>
        </>
    );
}
