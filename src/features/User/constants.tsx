import { UserRole, UserStatus } from 'types/User'
import { generateRandomLetters } from 'utils/generateRandomLetters'

export const initialUser = {
  first_name: '',
  last_name: '',
  title: '',
  phone: '',
  email: '',
  password: '',
  user_logo: '',
  status: UserStatus.ACTIVE,
  role_id: UserRole.ADMIN,
  background_color: '#626ed4',
  notes: '',
  address: '',
  user_identifier: generateRandomLetters(2),
  modules: {
    users: false,
    dashboard: false,
    leads: false,
    trash: false,
    offices: false,
  },
}
