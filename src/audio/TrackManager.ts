import { store } from "@/state/store";
import type { Track } from "@/types";
import { Sampler } from "tone";

export class TrackManager {
  private samplers: Map<string, Sampler> = new Map();
  constructor() {
    store.subscribe(() => {
      const tracks = store.getState().tracks;
      this.syncSamplers(tracks);
    });
  }

  private syncSamplers(tracks: Track[]) {
    // Removing samplers for deleted tracks
    for (const id of this.samplers.keys()) {
      if (!tracks.find((t) => t.id === id)) {
        this.samplers.get(id)?.dispose?.();
        this.samplers.delete(id);
      }
    }
    // Adding new tracks / Updating samplers for existing tracks
    for (const track of tracks) {
      if (!this.samplers.has(track.id)) {
        // Create a new sampler
        this.samplers.set(track.id, this.createSampler(track));
      } else {
        this.updateSampler(track);
      }
    }
  }
  createSampler(track: Track): Sampler {
    // TODO: Implement sampler creation logic based on track type and settings
    const sampler = new Sampler();
    console.log(`Created sampler for track ${track.id}`);
    return sampler;
  }
  updateSampler(track: Track): void {
    const sampler = this.samplers.get(track.id);
    if (!sampler) return;
    console.log(`Updated sampler for track ${track.id}`);
    // Updating logic based on track settings
  }

  dispose() {
    for (const sampler of this.samplers.values()) {
      sampler.dispose?.();
    }
    this.samplers.clear();
  }
}
