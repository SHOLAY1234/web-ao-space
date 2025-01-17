// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import invariant from 'tiny-invariant';
import { useWallet } from '@solana/wallet-adapter-react';
import type { PublicKey } from '@solana/web3.js';

import useWorkspace from '@/hooks/use-workspace';
import type { Profile } from '@/lib/models';
import type { Workspace } from '@/lib/web3';
import { createProfile, getProfile } from '@/lib/web3';

export interface ProfileContextValue {
  loaded: boolean;
  profile: Profile | null;
  createProfile: (name: string) => Promise<void>;
}

const defaultValue: ProfileContextValue = {
  loaded: false,
  profile: null,
  createProfile: async () => {},
};

const ProfileContext = React.createContext<ProfileContextValue>(defaultValue);

export interface ProfileProviderProps {
  children: React.ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const workspace = useWorkspace();
  const wallet = useWallet();

  // Update profile on workspace changes.
  useEffect(() => {
    const updateProfile = async (
      workspace: Workspace,
      ownerPublicKey: PublicKey,
    ) => {
      try {
        setProfile(await getProfile(workspace!, ownerPublicKey));
      } catch (error) {
        console.error('Loading fetching profile:', error);
      } finally {
        setLoaded(true);
      }
    };

    const clearProfile = () => {
      setProfile(null);
    };

    const { publicKey } = wallet;
    if (workspace && publicKey) {
      updateProfile(workspace, publicKey);
    } else {
      clearProfile();
    }
  }, [workspace, wallet]);

  const createProfileAndUpdate = useCallback(
    async (name: string) => {
      try {
        invariant(workspace, 'Expected workspace to be defined');
        const newProfile = await createProfile(workspace, name);
        setProfile(newProfile);
      } catch (error) {
        console.error('Loading creating profile:', error);
      }
    },
    [workspace],
  );

  const value = useMemo(
    () => ({
      loaded,
      profile,
      createProfile: createProfileAndUpdate,
    }),
    [loaded, profile, createProfileAndUpdate],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContext;
