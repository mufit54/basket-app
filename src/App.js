import { useState } from "react";
import {
  Button,
  Badge,
  Container,
  List,
  Indicator,
  Drawer,
  Group,
  Input,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { IconCircleCheck, IconBasket, IconDatabase } from "@tabler/icons-react";
import Card from "./components/Card";
import "./App.css";

const storeItems = [
  {
    id: 100,
    name: "Fotograf Makinesi",
    src: "camera",
    pirce: 20,
  },
  {
    id: 101,
    name: "Kulaklık",
    src: "headphone",
    price: 10,
  },
  {
    id: 102,
    name: "Oyun Konsolu",
    src: "joystick",
    price: 25,
  },
  { id: 103, name: "Retro Fotograf Makinesi", src: "retro-cam", price: 25 },
  {
    id: 104,
    name: "Oyuncak Araba",
    src: "toy-car",
    price: 25,
  },
  {
    id: 105,
    name: "Kol Saati",
    src: "watch",
    price: 25,
  },
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  let addToBasket = ({ id, name }) => {
    let basketIndex = basketItems.findIndex((item) => item.id === id);
    if (basketIndex >= 0) {
      let _basketItems = [...basketItems];
      _basketItems[basketIndex].count += 1;
      setBasketItems(_basketItems);
    } else {
      setBasketItems([...basketItems, { id, name, count: 1 }]);
    }
  };
  return (
    <Container>
      <Group align="end">
        <Input.Wrapper label="Arama">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Input.Wrapper>
        <Button onClick={() => setSearchValue("")}>Temizle</Button>
        <Indicator color="red" label={basketItems.length} size={22}>
          <Button onClick={() => setOpened(true)}>
            <IconBasket size={22} />
          </Button>
        </Indicator>
      </Group>
      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({ id, name, src }) => {
          return (
            <Card
              key={name}
              name={name}
              src={src}
              onAdd={() => addToBasket({ id, name })}
            />
          );
        })}
      </SimpleGrid>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sepetim"
        padding="md"
        size="md"
      >
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
          {basketItems.map(({ name, count }, index) => (
            <List.Item key={index}>
              <Group>
                <div>{name}</div> <Badge>{count}</Badge>
              </Group>
            </List.Item>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
