import { AdditionalInfoType } from "@/lib/types";
import React from "react";

type AdditionalInfoProps = {
  info: AdditionalInfoType;
};

export default function AdditionalInfo({
  info: {
    weight, // in grams
    dimentions,
    colors,
    materials,
  },
}: AdditionalInfoProps) {
  return (
    <div>
      <h2>Additional Information</h2>
      <ul>
        <li>
          <strong>Weight:</strong> {weight / 1000} kg
        </li>
        <li>
          <strong>Dimensions:</strong> {dimentions.join(" x ")} cm
        </li>
        <li>
          <strong>Colours:</strong> {colors.join(", ")}
        </li>
        <li>
          <strong>Material:</strong> {materials.join(", ")}
        </li>
      </ul>
    </div>
  );
}
