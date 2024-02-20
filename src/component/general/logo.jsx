import React from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "@mantine/core";
import { SiClockify } from "react-icons/si";

export default function Logo({ classname }) {
    return (
        <Link to="/">
            <Button color="gray" radius="xs" uppercase className={classname}>
                <Text
                    weight={700}
                    className={classname + "-text"}
                    style={{
                        padding: 5,
                        border: "3px solid white",
                        borderRadius: 30,
                    }}
                >
                    MTA<SiClockify />
                    lock
                </Text>
            </Button>
        </Link>
    );
}
