import React from "react";
import { Text, Checkbox } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import "../../css/filterForm.css";

export default function CheckBoxes({
    items,
    label,
    filters,
    setFilters,
    uncheck,
    setUnCheck,
    badgeValue,
    type,
}) {
    const [values, handlers] = useListState(items);
    React.useEffect(() => {
        if (uncheck) {
            handlers.setState((current) =>
                current.map((value) => ({ ...value, checked: false }))
            );
        }
    }, [uncheck]);

    React.useEffect(() => {
        let index = values.findIndex((ele) => ele.value === badgeValue);
        handlers.setItemProp(index, "checked", false);
    }, [badgeValue]);

    const handleCheck = (value, type) => {
        let tempFilters = { ...filters };
        tempFilters[type] = [...tempFilters[type], value];
        setFilters(tempFilters);
    };

    const handleUncheck = (value, type) => {
        let tempFilters = { ...filters };
        const index = tempFilters[type].indexOf(value);
        if (index > -1) {
            tempFilters[type].splice(index, 1);
        }
        setFilters(tempFilters);
    };

    return (
        <>
            <Text className="filter-radio-title">{label}</Text>
            {values.map((item, index) => {
                return (
                    <Checkbox
                        mt="xs"
                        ml={33}
                        size="md"
                        color="dark"
                        value={item.value}
                        label={item.value}
                        className="filter-radio-select"
                        key={item.value}
                        checked={item.checked}
                        onChange={(event) => {
                            /* Set the filter array */
                            event.currentTarget.checked
                                ? handleCheck(
                                      type !== "price" ? item.value : index,
                                      type
                                  )
                                : handleUncheck(
                                      type !== "price" ? item.value : index,
                                      type
                                  );

                            /* set checked value of checkbox */
                            handlers.setItemProp(
                                index,
                                "checked",
                                event.currentTarget.checked
                            );

                            /* uncheck all if clear button is clicked ! */
                            event.currentTarget.checked && setUnCheck(false);
                        }}
                    />
                );
            })}
        </>
    );
}
