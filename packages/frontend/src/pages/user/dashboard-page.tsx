import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  Grid,
  Avatar,
  Center,
  BackgroundImage,
  Space,
  Divider,
  AvatarGroup,
} from "@mantine/core";
import { FC } from "react";

type UserData = {
  name: string;
  avatar: string;
  bio?: string;
  role: string;
};

const fakeData: UserData[] = [
  {
    name: "Hello",
    avatar: "vite.svg",
    bio: "Welcome this is some random bio \\o/",
    role: "CEO",
  },
  {
    name: "Hi",
    avatar: "vite.svg",
    bio: "Sup! " + "I love gaming and tea. Feel free to ask me for help, ",
    role: "CTO",
  },
];

const UserList: FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Text
        size="300%"
        style={{
          fontFamily: "Brush Script MT",
          width: "70%",
          overflow: "auto",
          margin: "auto",
        }}
      >
        Our Members
      </Text>

      <Text
        size="sm"
        style={{ width: "70%", overflow: "auto", margin: "auto" }}
      >
        Blah blah blah Blah Blah blah
      </Text>

      <Space h="md" />
      <Text
        size="sm"
        style={{ width: "70%", overflow: "auto", margin: "auto" }}
      >
        Follow us!
      </Text>

      <Space h="md" />
      <Divider my="sm" variant="dashed" />
      <Space h="md" />

      <Grid m={12}>
        {fakeData.map((user) => (
          <Grid.Col key={user.name} span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <BackgroundImage src="some_card_background.png" radius="sm">
                  <Center maw={400} h={200}>
                    <AvatarGroup>
                      <Avatar src={user.avatar} alt={user.name} size={150} />
                    </AvatarGroup>
                  </Center>
                </BackgroundImage>
              </Card.Section>

              <Group justify="center" mt="md" mb="xs">
                <Badge variant="default">{user.name}</Badge>
                <Badge variant="light">{user.role}</Badge>
              </Group>

              <Text
                style={{ textAlign: "left", minHeight: 100 }}
                size="sm"
                c="dimmed"
              >
                {user.bio}
              </Text>

              <Button variant="light" fullWidth mt="md" radius="md">
                Visit Our Other Social Media
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default UserList;
