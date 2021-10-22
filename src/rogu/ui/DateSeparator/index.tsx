import React, { useContext } from "react";

import "./index.scss";
import Label, { LabelTypography } from "../Label";

import { getClassName } from "../../../utils";
import { getDateSeparatorDifference } from "./utils";
import { LocalizationContext } from "../../../lib/LocalizationContext";

export type DateSeparatorProps = {
  className?: string;
  createdAt: Date | number;
};

export default function DateSeparator({
  className,
  createdAt,
}: DateSeparatorProps) {
  const { stringSet } = useContext(LocalizationContext);

  return (
    <div className={getClassName([className, "rogu-date-separator"])}>
      <Label
        className="rogu-date-separator__content"
        type={LabelTypography.CAPTION_1}
      >
        {getDateSeparatorDifference(createdAt, {
          today: stringSet.LABEL__DATE_TODAY,
          yesterday: stringSet.LABEL__DATE_YESTERDAY,
          days: {
            0: stringSet.LABEL__DAY_SUNDAY,
            1: stringSet.LABEL__DAY_MONDAY,
            2: stringSet.LABEL__DAY_TUESDAY,
            3: stringSet.LABEL__DAY_WEDNESDAY,
            4: stringSet.LABEL__DAY_THURSDAY,
            5: stringSet.LABEL__DAY_FRIDAY,
            6: stringSet.LABEL__DAY_SATURDAY,
          },
        })}
      </Label>
    </div>
  );
}
