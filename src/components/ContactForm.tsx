"use client";

import { FormEvent, useState } from "react";
import { ISTANBUL_DISTRICTS } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          district: data.get("district"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {status === "ok" && <div className="alert alert-ok">Mesajınız alındı. En kısa sürede dönüş yapacağız.</div>}
      {status === "err" && (
        <div className="alert alert-err">Gönderilemedi. Ad, telefon ve mesaj alanlarını kontrol edin.</div>
      )}
      <form className="form" onSubmit={onSubmit}>
        <label>
          Ad Soyad
          <input type="text" name="name" required autoComplete="name" placeholder="Adınız" />
        </label>
        <label>
          Telefon
          <input type="tel" name="phone" required autoComplete="tel" placeholder="05xx xxx xx xx" />
        </label>
        <label>
          İlçe
          <select name="district" defaultValue="">
            <option value="">Seçiniz</option>
            {ISTANBUL_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mesaj
          <textarea name="message" required placeholder="Kısaca ihtiyacınızı yazın" />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </>
  );
}
