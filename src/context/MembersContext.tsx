import { ReactNode, createContext, useState } from 'react';
import { Member } from '../common/types';

type Props = {
  children: ReactNode;
};

interface MembersProviderValues {
  members: Member[];
  setMembers: (members: Member[]) => void;
}

export const MembersContext = createContext<MembersProviderValues | null>(null);

export const MembersProvider = ({ children }: Props) => {
  const [members, setMembers] = useState<Member[]>([]);

  return (
    <MembersContext.Provider value={{ members, setMembers }}>
      {children}
    </MembersContext.Provider>
  );
};
