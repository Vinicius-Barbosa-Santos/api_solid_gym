import { Environment } from "vitest";

const prismaEnvironment: Environment = {
  name: "prisma",
  transformMode: "ssr", // ou 'web', dependendo do seu caso
  async setup() {
    console.log("Setup");

    return {
      async teardown() {
        console.log("Teardown");
      },
    };
  },
};

export default prismaEnvironment;
