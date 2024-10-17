'use client';
import React from 'react';
import JSON_schema_to_object from '@/utils/json-schema-to-object';
import { useEffect } from 'react';
const JSON_schema = require('../utils/json-schema.json');

export default function Home() {
  useEffect(() => {
    JSON_schema_to_object(JSON_schema);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="h1">Result is in the console</h1>
      </main>
    </div>
  );
}
