
export enum Commands {
  HELP = 'help',
  START = 'start',
  STOP = 'stop',
  GO = 'go',
  USE = 'use',
  CHAT = 'chat',
  PEEK = 'peek',

  // will we have time for v2?
  // SAVE = 'save',
  // RESET = 'reset',
  // LOAD = 'load',
  // DROP = 'drop',
  // TAKE = 'take',
}

export enum ItemType {
  HEALTH = 'health', // These items affect the player's health
  ENERGY = 'energy', // These items affect the player's energy
  GAMBLE = 'gamble', // These items have a chance of positive or negative outcome
  SCRY = 'scry', // These items can simulate a gamble item, only positive outcome is applied
  ACHIEVEMENT = 'achievement', // These items have no effects
  PLOT = 'plot', // These items offer a hidden plot
}

export enum Condition {
  ITEM_EXISTS = 'item exists', // The condition is true if the item exists
  ITEM_DNE = 'item does not exist', // The condition is true if the item does not exist
  ENTRY = 'entry', // The condition is true if the player has entered the room
  EXIT = 'exit', // The condition is true if the player has exited the room
  HEALTH_ABOVE = 'health above', // The condition is true if the player's health is above the specified amount
  HEALTH_BELOW = 'health below', // The condition is true if the player's health is below the specified amount
  HEALTH_EQUAL = 'health equal', // The condition is true if the player's health is equal to the specified amount
  ENERGY_ABOVE = 'energy above', // The condition is true if the player's energy is above the specified amount
  ENERGY_BELOW = 'energy below', // The condition is true if the player's energy is below the specified amount
  ENERGY_EQUAL = 'energy equal', // The condition is true if the player's energy is equal to the specified amount
}

export enum Effect {
  DEATH = 'death', // The player immediately loses all their lives
  HEALTH_INCREASE = 'health increase', // The player's health is increased by the specified amount
  HEALTH_DECREASE = 'health decrease', // The player's health is decreased by the specified amount
  ENERGY_INCREASE = 'energy increase', // The player's energy is increased by the specified amount
  ENERGY_DECREASE = 'energy decrease', // The player's energy is decreased by the specified amount
  TELEPORT = 'teleport', // The player is teleported to the specified room
  GET_ITEM = 'get item', // The player acquires the specified item (minted on Flow)
}

// entities are AI NPCs in the game
export enum EntityType {
  DEFAULT = 'default', // This is the default entity in the game, provided by the platform
}

export interface Item {
  name: string;
  description: string;
  type: ItemType;
  image_url: string;
  effect: Effect;
  cooldown: number; // number of turns before the item can be used again
}

// entities are AI NPCs in the game, ie, LLMs
export interface Entity {
  name: string;
  description: string;
  type: EntityType;
  image_url: string;
  items: Item[]; // items that the entity can give to the player
  conditions: Condition[]; // conditions that the player must meet to obtain item
  difficulty: number; // how difficult it is to obtain item from entity
  params: object; // parameters for the entity's behavior (eg, personality)
}

export interface Exit {
  direction: string; // the direction of the exit
  room: Room; // the room that the exit leads to
  is_egg: boolean; // whether the exit is an easter egg (ie, hidden)
}

export interface Event {
  condition: Condition; // the condition that triggers the event
  effect: Effect; // the effect that occurs when the condition is met
}

export interface Room {
  name: string;
  description: string;
  exits: Exit[];
  entities: Entity[];
  items: Item[];
  events: Event[];
}

export interface Adventure {
  id: string; // uuid
  title: string;
  description: string;
  image_url: string;
  rooms: Room[];
  items: Item[];
  entities: Entity[];
  cost: number; // the cost of the game in tokens
  currency: string; // the token contract address
  start_room: string; // the uuid of the starting room
  end_room: string; // the uuid of the ending room
  random_spawn: boolean; // whether the player can randomly spawn in any room
  random_items: boolean; // whether the items are randomly distributed in the adventure
}

export enum Highlights {
  'item' = '#00ffff', // cyan
  'entity' = '#ff00ff', // magenta
  'direction' = '#ffff00' // yellow
}

// TODO: Add types for the various enums