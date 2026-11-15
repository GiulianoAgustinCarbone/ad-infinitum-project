import { describe, expect, it } from "vitest";
import { aCsv } from "./csv";

describe("aCsv", () => {
  it("escapa comas y comillas, y deja vacios los nulos", () => {
    const s = aCsv([
      ["a", "b"],
      ["x,y", 'dice "hola"'],
      [1, null],
    ]);
    expect(s).toBe('﻿a,b\r\n"x,y","dice ""hola"""\r\n1,\r\n');
  });
});
