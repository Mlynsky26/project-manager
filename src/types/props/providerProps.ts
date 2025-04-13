import { Specification } from "@/lib/prisma/specification";
import { ReactNode } from "react";
import { Base } from "../base";

export interface ProviderProps<T extends Base> {
  children: ReactNode;
  specification?: Specification<T>;
}
