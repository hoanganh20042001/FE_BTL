import React from "react";
import { Grid, Text, Divider, Button, Badge, ActionIcon } from "@mantine/core";
import { HiOutlineFilter, HiX } from "react-icons/hi";
import CheckBoxes from "./checkBoxGroup";
import Selects from "./multiSelect";
import axios from "axios";

const prices = [
    { value: "0 - 1.000.000đ", checked: false },
    { value: "1.000.000 - 2.000.000đ", checked: false },
    { value: "2.000.000 - 3.000.000đ", checked: false },
    { value: "3.000.000 - 5.000.000đ", checked: false },
    { value: "5.000.000 - 10.000.000đ", checked: false },
    { value: "Trên 10.000.000đ", checked: false },
];
const brands = [
    { value: "Rolex", checked: false },
    { value: "Seiko", checked: false },
    { value: "Casio", checked: false },
    { value: "Citizen", checked: false },
    { value: "Fossil", checked: false },
];
const category = [
    { value: "Đồng hồ nam", checked: false },
    { value: "Đồng hồ nữ", checked: false },
    { value: "Đồng hồ trẻ em", checked: false },
];
const type = [
    { value: "Cơ - automatic", checked: false },
    { value: "Điện tử", checked: false },
    { value: "Treo tường", checked: false },
    { value: "Năng lượng mặt trời", checked: false },
];

export default function FilterForm({ setData }) {
    const [filters, setFilters] = React.useState({
        price: [],
        brand: [],
        sex: [],
        category: [],
    });
    const [unCheck, setUnCheck] = React.useState(false);
    const [badgeValue, setBadgeValue] = React.useState(null);
    const [size, setSize] = React.useState([0, 0]);

    const handleClear = () => {
        setUnCheck(true);
        setFilters({ price: [], brand: [], sex: [], category: [] });
    };

    const handleCloseBadge = (value, type) => {
        let tempFilters = { ...filters };
        const index = tempFilters[type].indexOf(value);
        if (index > -1) {
            tempFilters[type].splice(index, 1);
        }
        setFilters(tempFilters);
        value = [0, 1, 2, 3, 4, 5].includes(value) ? trueValue(value) : value;
        setBadgeValue(value);
    };

    const RemoveButton = ({ value, type }) => {
        return (
            <ActionIcon
                size="xs"
                color="dark"
                radius="xl"
                variant="transparent"
                onClick={() => handleCloseBadge(value, type)}
            >
                <HiX />
            </ActionIcon>
        );
    };

    const trueValue = (value) => {
        const arr = [
            "0 - 1.000.000đ",
            "1.000.000 - 2.000.000đ",
            "2.000.000 - 3.000.000đ",
            "3.000.000 - 5.000.000đ",
            "5.000.000 - 10.000.000đ",
            "Trên 10.000.000đ",
        ];

        return arr[value];
    };

    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    React.useEffect(() => {
        console.log(JSON.stringify(filters));
        async function fetchFilter() {
            await axios
                .post(
                    `http://localhost:8080/api/product/fiter`,filters
                )
                .then((response) => {
                    console.log(response);
                    setData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchFilter();
    }, [filters]);

    return (
        <Grid>
            <Grid.Col>
                <Text style={{ fontSize: 23, fontWeight: "bold" }}>
                    <HiOutlineFilter style={{ marginRight: 10 }} />
                    Lọc sản phẩm
                </Text>
                <div>
                    {filters["price"].map((filter) => {
                        return (
                            <Badge
                                variant="outline"
                                color="dark"
                                key={filter}
                                rightSection={
                                    <RemoveButton value={filter} type="price" />
                                }
                                size="lg"
                            >
                                {[0, 1, 2, 3, 4, 5].includes(filter)
                                    ? trueValue(filter)
                                    : filter}
                            </Badge>
                        );
                    })}
                    {filters["brand"].map((filter) => {
                        return (
                            <Badge
                                variant="outline"
                                color="dark"
                                key={filter}
                                rightSection={
                                    <RemoveButton value={filter} type="brand" />
                                }
                                size="lg"
                            >
                                {filter}
                            </Badge>
                        );
                    })}
                    {filters["sex"].map((filter) => {
                        return (
                            <Badge
                                variant="outline"
                                color="dark"
                                key={filter}
                                rightSection={
                                    <RemoveButton value={filter} type="sex" />
                                }
                                size="lg"
                            >
                                {filter}
                            </Badge>
                        );
                    })}
                    {filters["category"].map((filter) => {
                        return (
                            <Badge
                                variant="outline"
                                color="dark"
                                key={filter}
                                rightSection={
                                    <RemoveButton
                                        value={filter}
                                        type="category"
                                    />
                                }
                                size="lg"
                            >
                                {filter}
                            </Badge>
                        );
                    })}
                </div>

                {filters["price"].length > 0 ||
                    filters["brand"].length > 0 ||
                    filters["category"].length > 0 ||
                    filters["sex"].length > 0 ? (
                    <Button
                        variant="outline"
                        style={{
                            marginTop: 10,
                            borderRadius: 20,
                            width: "100%",
                        }}
                        color="red"
                        onClick={() => handleClear()}
                    >
                        Clear
                    </Button>
                ) : null}
            </Grid.Col>
            {size[0] > 768 ? (
                <Grid.Col>
                    <Divider size="md" />
                </Grid.Col>
            ) : null}
            <Grid.Col xl={12} lg={12} md={6} sm={6} xs={12}>
                {size[0] > 768 ? (
                    <CheckBoxes
                        items={prices}
                        label="Mức giá"
                        filters={filters}
                        setFilters={setFilters}
                        uncheck={unCheck}
                        setUnCheck={setUnCheck}
                        badgeValue={badgeValue}
                        type="price"
                    />
                ) : (
                    <Selects
                        items={prices}
                        label="Mức giá"
                        filters={filters}
                        setFilters={setFilters}
                        type="price"
                    />
                )}
            </Grid.Col>
            {size[0] > 768 ? (
                <Grid.Col>
                    <Divider size="md" />
                </Grid.Col>
            ) : null}
            <Grid.Col xl={12} lg={12} md={6} sm={6} xs={12}>
                {size[0] > 768 ? (
                    <CheckBoxes
                        items={brands}
                        label="Thương hiệu"
                        filters={filters}
                        setFilters={setFilters}
                        uncheck={unCheck}
                        setUnCheck={setUnCheck}
                        badgeValue={badgeValue}
                        type="brand"
                    />
                ) : (
                    <Selects
                        items={brands}
                        label="Thương hiệu"
                        filters={filters}
                        setFilters={setFilters}
                        type="brand"
                    />
                )}
            </Grid.Col>
            {size[0] > 768 ? (
                <Grid.Col>
                    <Divider size="md" />
                </Grid.Col>
            ) : null}
            <Grid.Col xl={12} lg={12} md={6} sm={6} xs={12}>
                {size[0] > 768 ? (
                    <CheckBoxes
                        items={category}
                        label="Loại đồng hồ"
                        filters={filters}
                        setFilters={setFilters}
                        uncheck={unCheck}
                        setUnCheck={setUnCheck}
                        badgeValue={badgeValue}
                        type="sex"
                    />
                ) : (
                    <Selects
                        items={category}
                        label="Loại đồng hồ"
                        filters={filters}
                        setFilters={setFilters}
                        type="sex"
                    />
                )}
            </Grid.Col>
            {size[0] > 768 ? (
                <Grid.Col>
                    <Divider size="md" />
                </Grid.Col>
            ) : null}
            <Grid.Col xl={12} lg={12} md={6} sm={6} xs={12}>
                {size[0] > 768 ? (
                    <CheckBoxes
                        items={type}
                        label="Dòng máy"
                        filters={filters}
                        setFilters={setFilters}
                        uncheck={unCheck}
                        setUnCheck={setUnCheck}
                        badgeValue={badgeValue}
                        type="category"
                    />
                ) : (
                    <Selects
                        items={type}
                        label="Dòng máy"
                        filters={filters}
                        setFilters={setFilters}
                        type="category"
                    />
                )}
            </Grid.Col>
        </Grid>
    );
}
