import React from "react";
import { Grid, Breadcrumbs, Anchor, Text } from "@mantine/core";

export default function BreadCrumbs({ location, size, name }) {
    const anchorUtil = (location) => {
        let locations = "Home" + location.pathname;
        locations = locations.split("/");
        if (name) {
            locations.splice(-1, 1, name);
            locations.splice(-2, 1, "products");
        }
        return locations.map((item, index) =>
            index === locations.length - 1 ? (
                <Text>{item}</Text>
            ) : (
                <Anchor href={item === "Home" ? "/" : "/" + item} key={index}>
                    {item}
                </Anchor>
            )
        );
    };

    let anchors = anchorUtil(location);

    return (
        <>
            {size > 768 ? (
                <Grid.Col>
                    <Breadcrumbs style={{ marginLeft: "8%" }}>
                        {anchors}
                    </Breadcrumbs>
                </Grid.Col>
            ) : null}
        </>
    );
}
