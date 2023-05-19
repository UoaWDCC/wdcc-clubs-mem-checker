interface Joke {
	title: string;
	content: string;
}

interface Food {
	healthLevel?: number;
}

interface Fruit {
	name: string | number;
	colour: any;
	funnyJokes?: Joke;
	isYummy?: (fruit: Fruit) => number;
	[user: string]: string;
}

enum FruitColour {
	RED = 'red',
	PINK = 'pink',
	GREEN = 'green',
}
interface UserList {
	[user: string]: string;
}

const list: UserList = {
	Nimit: 'Nimit',
	Sebastian: 'Sebastian',
};

const nimitUser = list.Nimit;

type FruitType = {
	name: string | number;
	colour: FruitColour;
	funnyJokes?: Joke;
};

const fruit: FruitType = {
	name: '',
	colour: FruitColour.RED,
};

const fruitTwo: Fruit = {
	name: '',
	colour: '',
};

fruit['colour'] = FruitColour.GREEN;

class FruitClass {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

const fruitClass = new FruitClass('apple');
