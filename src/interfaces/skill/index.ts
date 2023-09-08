import { PerformanceAssessmentInterface } from 'interfaces/performance-assessment';
import { ReservationInterface } from 'interfaces/reservation';
import { UsageTrackingInterface } from 'interfaces/usage-tracking';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SkillInterface {
  id?: string;
  name: string;
  description?: string;
  user_id: string;
  demand?: number;
  performance?: number;
  usage_count?: number;
  created_at?: any;
  updated_at?: any;
  performance_assessment?: PerformanceAssessmentInterface[];
  reservation?: ReservationInterface[];
  usage_tracking?: UsageTrackingInterface[];
  user?: UserInterface;
  _count?: {
    performance_assessment?: number;
    reservation?: number;
    usage_tracking?: number;
  };
}

export interface SkillGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  user_id?: string;
}
