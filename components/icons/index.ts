import type { SVGProps } from "react";
import type { IconKey } from "@/data/products";
import {
  AccessoryIcon,
  DressIcon,
  JacketIcon,
  OnesieIcon,
  PoloIcon,
  ShoeIcon,
  ShortsIcon,
} from "./ClothingIcons";

export const iconMap: Record<IconKey, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  dress: DressIcon,
  polo: PoloIcon,
  onesie: OnesieIcon,
  shorts: ShortsIcon,
  shoe: ShoeIcon,
  jacket: JacketIcon,
  accessory: AccessoryIcon,
};

export * from "./ClothingIcons";
