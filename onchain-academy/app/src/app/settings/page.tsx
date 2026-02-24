'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { currentUser } from '@/data/mock-data';
import { useTranslation } from '@/i18n/provider';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[900px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">{t('settings.tabs.profile')}</TabsTrigger>
          <TabsTrigger value="preferences">{t('settings.tabs.preferences')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.tabs.notifications')}</TabsTrigger>
          <TabsTrigger value="privacy">{t('settings.tabs.privacy')}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline">{t('settings.profile.changePhoto')}</Button>
            </div>
            <div className="grid gap-4">
              <div><Label>{t('settings.profile.fullName')}</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><Label>{t('settings.profile.username')}</Label><Input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
              <div><Label>{t('settings.profile.bio')}</Label><Textarea value={bio} onChange={(e) => setBio(e.target.value)} /></div>
            </div>
            <Button>{t('settings.profile.saveChanges')}</Button>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="p-6 space-y-6">
            <h3 className="font-semibold">{t('settings.preferences.title')}</h3>
            <div className="flex items-center justify-between">
              <div><p className="font-medium">{t('settings.preferences.theme')}</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium">{t('settings.preferences.devMode')}</p><p className="text-sm text-muted-foreground">{t('settings.preferences.devModeDesc')}</p></div>
              <Switch />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6 space-y-6">
            <h3 className="font-semibold">{t('settings.notifications.title')}</h3>
            {['email', 'push', 'courseUpdates', 'achievements'].map((key) => (
              <div key={key} className="flex items-center justify-between">
                <div><p className="font-medium">{t(`settings.notifications.${key}`)}</p><p className="text-sm text-muted-foreground">{t(`settings.notifications.${key}Desc`)}</p></div>
                <Switch defaultChecked={key === 'email' || key === 'achievements'} />
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="p-6 space-y-6">
            <h3 className="font-semibold">{t('settings.privacy.title')}</h3>
            {['publicProfile', 'leaderboard', 'activity'].map((key) => (
              <div key={key} className="flex items-center justify-between">
                <div><p className="font-medium">{t(`settings.privacy.${key}`)}</p><p className="text-sm text-muted-foreground">{t(`settings.privacy.${key}Desc`)}</p></div>
                <Switch defaultChecked={key !== 'activity'} />
              </div>
            ))}
            <div className="pt-4 border-t space-y-4">
              <h4 className="font-semibold">{t('settings.privacy.dataManagement')}</h4>
              <div className="flex justify-between items-center">
                <div><p className="font-medium">{t('settings.privacy.downloadData')}</p><p className="text-sm text-muted-foreground">{t('settings.privacy.downloadDataDesc')}</p></div>
                <Button variant="outline">Download</Button>
              </div>
              <div className="flex justify-between items-center">
                <div><p className="font-medium text-destructive">{t('settings.privacy.deleteAccount')}</p><p className="text-sm text-muted-foreground">{t('settings.privacy.deleteAccountDesc')}</p></div>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
