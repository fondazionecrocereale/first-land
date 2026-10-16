"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";

const SPLASH_MS = 2000;
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL ?? "https://g-acesorios.vercel.app/";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Escribe un nombre de al menos 2 caracteres.");
      return;
    }
    setSubmitting(true);
    const url = new URL(REDIRECT_URL);
    url.searchParams.set("nombre", trimmed);
    window.location.assign(url.toString());
  }

  if (showSplash) {
    return (
      <main className={styles.splash}>
        <span className={styles.brand}>Firstland</span>
        <span className={styles.spinner} aria-label="Cargando" role="status" />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1 className={styles.title}>Bienvenido</h1>
        <p className={styles.subtitle}>Escribe tu nombre para continuar</p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoFocus
            autoComplete="given-name"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            className={styles.input}
            aria-invalid={!!error}
            aria-describedby={error ? "name-error" : undefined}
          />
          {error && (
            <span id="name-error" className={styles.error}>
              {error}
            </span>
          )}
          <button type="submit" className={styles.button} disabled={submitting}>
            {submitting ? "Entrando..." : "Continuar"}
          </button>
        </form>
      </section>
    </main>
  );
}
