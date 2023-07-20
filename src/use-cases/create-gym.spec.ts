import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreatGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreatGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreatGymUseCase(gymsRepository);
  });

  it("should be able to register", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -3.6892135,
      longitude: -40.3176736,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
