import { UserInterface } from 'interfaces/user';
import { SkillInterface } from 'interfaces/skill';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceAssessmentInterface {
  id?: string;
  assessment_date: any;
  user_id: string;
  skill_id: string;
  rating?: number;
  feedback?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  skill?: SkillInterface;
  _count?: {};
}

export interface PerformanceAssessmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  skill_id?: string;
  feedback?: string;
}
