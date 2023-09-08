import { UserInterface } from 'interfaces/user';
import { SkillInterface } from 'interfaces/skill';
import { GetQueryInterface } from 'interfaces';

export interface ReservationInterface {
  id?: string;
  start_date: any;
  end_date: any;
  user_id: string;
  skill_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  skill?: SkillInterface;
  _count?: {};
}

export interface ReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  skill_id?: string;
  status?: string;
}
