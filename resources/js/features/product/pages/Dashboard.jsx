import http from "@/core/api/axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        let active = true;

        http
            .get("/status")
            .then(() => {
                if (active) {
                    setStatus("online");
                }
            })
            .catch(() => {
                if (active) {
                    setStatus("offline");
                }
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <section className="space-y-6">
            <header className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                    Tokolokal
                </p>
                <h1 className="text-3xl font-semibold text-neutral-900">Dashboard</h1>
                <p className="max-w-2xl text-sm text-neutral-500">
                    React mengambil alih seluruh UI. Mulai kembangkan halaman di folder
                    <code className="ml-1 rounded bg-neutral-900 px-2 py-1 text-xs text-white">
                        resources/js/features
                    </code>
                    .
                </p>
            </header>

            <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900">Status Backend</h2>
                <p className="text-sm text-neutral-600">
                    API Laravel saat ini <span className="font-medium text-orange-600">{status}</span>.
                    Endpoint dapat Anda sesuaikan di{" "}
                    <code className="ml-1 rounded bg-neutral-900 px-2 py-1 text-xs text-white">
                        core/api/axios.js
                    </code>
                </p>
            </article>
        </section>
    );
};

export default Dashboard;




