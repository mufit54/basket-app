import { useState } from "react";
import { Container, List, Input, ThemeIcon, SimpleGrid } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import Card from "./components/Card";
import "./App.css";

const storeItems = [
  {
    name: "Fotograf Makinesi",
    src: "camera",
    pirce: 20,
  },
  {
    name: "Kulaklık",
    src: "headphone",
    price: 10,
  },
  {
    name: "Oyun Konsolu",
    src: "joystick",
    price: 25,
  },
  {
    name: "Retro Fotograf Makinesi",
    src: "retro-cam",
    price: 25,
  },
  {
    name: "Oyuncak Araba",
    src: "toy-car",
    price: 25,
  },
  {
    name: "Kol Saati",
    src: "watch",
    price: 25,
  },
];

function App() {
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue) >= 0
  );
  return (
    <Container>
      <Input.Wrapper label="Arama">
        <Input onChange={(e) => setSearchValue(e.target.value)} />
      </Input.Wrapper>
      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({ name, src }) => {
          return (
            <Card
              key={name}
              name={name}
              src={src}
              onAdd={() => setBasketItems([...basketItems, { name }])}
            />
          );
        })}
      </SimpleGrid>
      <List
        className="List"
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size="1rem" />
          </ThemeIcon>
        }
      >
        {basketItems.map(({ name }, index) => (
          <List.Item key={index}>{name}</List.Item>
        ))}
      </List>
    </Container>
  );
}

export default App;
