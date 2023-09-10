import Game from "./Game";
import data from "./data/word-bank.json";

export default async function Home() {
  const data: { wordsList: Array<string> } = await getData();

  return (
    <section className="flex flex-col justify-center m-auto relative bg-inherit dar:bg-inherit">
      <Game wordsList={data.wordsList} />
    </section>
  );
}

async function getData() {
  const wordsList = [...data];

  return { wordsList };
}
