interface IListDataResponsive<T extends any[], P extends number> {
  data: T;
  total?: P;
  page: number;
}

type TDataCollection = {
  name: string;
  createdBy: string;
  shortBio: string;
};

const listCollection: IListDataResponsive<TDataCollection[], number> = {
  data: [
    {
      name: "sadasas",
      createdBy: "me",
      shortBio: "string",
    },
  ],
  total: 0,
  page: 1,
};

// passing types to own functions

const makeFetch = <TData>(url: string): Promise<TData> => {
  return fetch(url).then((res) => res.json());
};

// passing types to set
// you can pass these type parameters to
// other parts of JS, like Set and Map

const set = new Set<number>();
set.add(1);

// inferring-types-passed-to-function
const addIdToObject = <TObj>(obj: TObj): TObj => {
  return {
    ...obj,
    id: "11",
  };
};

const result1 = addIdToObject({
  firstName: "first",
  lastName: "last",
  id: "15445",
});

//generic-constraints

// type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<
//   ReturnType<T>
// >;

async function getUser(): Promise<{
  id: number;
  name: string;
}> {
  return { id: 1, name: "John Doe" };
}

type User = Awaited<ReturnType<typeof getUser>>;

async function printUser(): Promise<void> {
  const user: User = await getUser();
  console.log(user);
}

printUser();

const objectEx = {
  name: "hlo",
  age: 14,
};
const getValue = <T extends object, TKey extends keyof T>(
  obj: T,
  key: TKey
) => {
  return obj[key];
};

// thirst party zod

const result2 = getValue(objectEx, "name");

export { result1, result2 };
