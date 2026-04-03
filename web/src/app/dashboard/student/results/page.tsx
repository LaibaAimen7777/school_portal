"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await api.get("/student/results");
    setResults(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Results</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Exam</th>
            <th>Marks</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.subject}</td>
              <td>{r.examType}</td>
              <td>{r.score}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
