import { Grid, Group, Avatar, Text } from "@mantine/core";
import "../../css/detail.css";
import React from "react";

export default function CommentCard({ name, date, content }) {
    return (
        <Grid className="comment-card-container">
            <Grid.Col>
                <Group direction="row">
                    <Avatar
                        src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"
                        alt="avatar"
                    />
                    <Group direction="column" spacing={1}>
                        <Text>{name}</Text>
                        <Text color="#cfcfcf">{date}</Text>
                    </Group>
                </Group>
            </Grid.Col>
            <Grid.Col>
                <Text>{content}</Text>
            </Grid.Col>
        </Grid>
    );
}
