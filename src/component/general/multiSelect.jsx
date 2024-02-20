import React from "react";
import { Select } from "@mantine/core";
import "../../css/filterForm.css";

export default function Selects({ type, items, label, filters, setFilters }) {
    const handleChange = (value, type) => {
        if (type === "price") {
            const arr = [
                "0 - 1.000.000đ",
                "1.000.000 - 2.000.000đ",
                "2.000.000 - 3.000.000đ",
                "3.000.000 - 5.000.000đ",
                "5.000.000 - 10.000.000đ",
                "Trên 10.000.000đ",
            ];

            value = arr.indexOf(value);
        }

        let tempFilters = { ...filters };
        tempFilters[type] = [...tempFilters[type], value];
        setFilters(tempFilters);
    };

    return (
        <Select
            data={items.map((item) => item.value)}
            placeholder={label}
            transition="pop-top-left"
            transitionDuration={300}
            transitionTimingFunction="ease"
            onChange={(value) => handleChange(value, type)}
        />
    );
}
