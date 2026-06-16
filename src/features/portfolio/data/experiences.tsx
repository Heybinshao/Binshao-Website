import { BriefcaseBusinessIcon } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "freelance-designer",
    companyName: "Freelance",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "1",
        title: "Freelance Designer / Design Engineer",
        employmentPeriod: {
          start: "2023",
        },
        employmentType: "Full-time",
        icon: <BriefcaseBusinessIcon />,
        description: `- 设计漫步周刊主理人，每周精选设计灵感与行业资讯
- Rive 内容创作者，探索互动动画的无限可能
- 独立开发多款产品与工具，从设计到开发全流程负责`,
        skills: [
          "UI/UX Design",
          "Rive",
          "Figma",
          "Content Creation",
          "Product Design",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
]
