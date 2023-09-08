import { UserInterface } from 'interfaces/user';
import { SkillInterface } from 'interfaces/skill';
import { GetQueryInterface } from 'interfaces';

export interface UsageTrackingInterface {
  id?: string;
  user_id: string;
  skill_id: string;
  usage_date: any;
  usage_count?: number;
  usage_duration?: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  skill?: SkillInterface;
  _count?: {};
}

export interface UsageTrackingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  skill_id?: string;
}
