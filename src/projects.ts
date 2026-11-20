/** English name of the chair project. Change this string to rename it everywhere on the page. */
export const flowChairName = "Flow Chair";

export const projectContext = {
  kixmi: "Mondragon University, 3rd year",
  flowChair: "Kobe Denshi, final year",
  adjust: "Mondragon University, 3rd year",
} as const;

/** Short facts already stated in the copy, shown as one spec line on each cover. */
export const projectSpecs = {
  kixmi: [projectContext.kixmi, "1st prize, Vidrala", "Glass packaging"],
  flowChair: [projectContext.flowChair, "18 mm CNC plywood", "480 × 480 × 658 mm"],
  adjust: [projectContext.adjust, "Silicone on aluminium", "Tool-free clamp"],
} as const;
