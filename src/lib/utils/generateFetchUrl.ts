import { Base } from "@/types/base";
import {
  Specification,
  specificationToSearchParams,
} from "../prisma/specification";

export default function generateFetchUrl<T extends Base>(
  route: string,
  specification?: Specification<T>
): string {
  const params = specificationToSearchParams(specification);
  const queryString = params.toString();
  const url = `${route}${queryString ? `?${queryString}` : ""}`;
  return url;
}
