export interface OpCharacters {
  id: number;
  name: string;
  size?: string;
  age?: string;
  bounty?: string;
  crew?: Crew;
  fruit?: Fruit;
  job: null | string;
  status: OpCharacterStatus | null;
}

export interface Crew {
  id: number;
  name: string;
  description: null;
  status: CrewStatus;
  number?: string;
  roman_name?: string;
  total_prime?: string;
  is_yonko: boolean;
}

export enum CrewStatus {
  Actif = 'actif',
  Assets = 'assets',
  Dissolved = 'dissolved',
  Inactif = 'inactif',
  Inactive = 'inactive',
  Inconnu = 'inconnu',
  Unknown = 'unknown',
}

export interface Fruit {
  id: number;
  name: string;
  description: string;
  type: Type;
  filename: string;
  roman_name?: string;
  technicalFile: string;
}

export enum Type {
  Logia = 'Logia',
  Paramecia = 'Paramecia',
  Smile = 'Smile',
  Zoan = 'Zoan',
  ZoanAntique = 'Zoan Antique',
  ZoanMythique = 'Zoan Mythique',
}

export enum OpCharacterStatus {
  Deceased = 'deceased',
  Living = 'living',
  Unknown = 'unknown',
  Vivant = 'vivant',
}
