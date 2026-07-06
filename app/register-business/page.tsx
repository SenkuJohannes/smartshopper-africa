"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function RegisterBusiness() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [slug, setSlug] = useState("");

  async function createBusiness() {
    const { data, error } = await supabase
      .from("businesses")
      .insert([
        {
          name,
          email,
          phone,
          slug,
          subscription: "Free",
          status: "active",
        },
      ])
      .select();

    console.log(data);
    console.log(error);

    if (!error) {
      alert("Business created successfully!");
    } else {
      alert(error.message);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1>Register Business</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          marginTop: 30,
        }}
      >
        <input
          placeholder="Business Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Business Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <button onClick={createBusiness}>
          Create Business
        </button>
      </div>
    </main>
  );
}