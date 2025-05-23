import { Armor } from './armor';
import { AttributeName, SkillName } from './attributeTree';
import { Cybernetic } from './cybernetic';
import { Item } from './item';
import { Modifier } from './modifier';
import { Weapon } from './weapon';

interface Action {
  id: number;
  name: string;
  description: string;
  costs: ActionCosts;
  roll: ActionRoll[];
  actionType: ActionType;
  actionSubtypes: string[];
  duration: { unit: string; value: number | null };
  weaponId?: number;
  weapon?: Weapon;
  armorId?: number;
  armor?: Armor;
  cyberneticId?: number;
  cybernetic?: Cybernetic;
  itemId?: number;
  item?: Item;
  baseActionId?: number;
  modifiers: Modifier[];
}

interface ActionCosts {
  actionPoints?: number;
  reactionPoints?: number;
  power?: number;
  health?: number;
  sanity?: number;
  wyrmShells?: number;
  currentAmmoCount?: number;
}

interface ActionRoll {
  attribute: AttributeName;
  skill: SkillName;
}

enum ActionType {
  action = 'action',
  extendedAction = 'extendedAction',
  reaction = 'reaction',
}

enum ActionCostStat {
  actionPoints = 'actionPoints',
  reactionPoints = 'reactionPoints',
  health = 'health',
  sanity = 'sanity',
  power = 'power',
  wyrmShells = 'wyrmShells',
}
