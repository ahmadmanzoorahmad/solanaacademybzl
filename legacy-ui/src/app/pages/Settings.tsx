import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User, Wallet, Settings as SettingsIcon, Bell, Shield, Code } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { useLanguage } from '../i18n';
import { languageInfo, Language } from '../i18n/translations';

export function Settings() {
  const { t, language, setLanguage, devMode, setDevMode } = useLanguage();
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('settings.title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('settings.subtitle')}
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            {t('settings.tabs.profile')}
          </TabsTrigger>
          <TabsTrigger value="accounts">
            <Wallet className="w-4 h-4 mr-2" />
            {t('settings.tabs.accounts')}
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SettingsIcon className="w-4 h-4 mr-2" />
            {t('settings.tabs.preferences')}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            {t('settings.tabs.notifications')}
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="w-4 h-4 mr-2" />
            {t('settings.tabs.privacy')}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">{t('settings.profile.title')}</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="avatar">{t('settings.profile.picture')}</Label>
                <div className="flex items-center gap-4">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                  />
                  <Button variant="outline">{t('settings.profile.changePhoto')}</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t('settings.profile.fullName')}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">{t('settings.profile.username')}</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t('settings.profile.bio')}</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">{t('settings.profile.twitter')}</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/username"
                  defaultValue={currentUser.socialLinks.twitter}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">{t('settings.profile.github')}</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/username"
                  defaultValue={currentUser.socialLinks.github}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button>{t('settings.profile.saveChanges')}</Button>
                <Button variant="outline">{t('common.cancel')}</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">{t('settings.accounts.title')}</h2>
            
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14F195] to-[#9945FF] flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{t('settings.accounts.solanaWallet')}</p>
                    <p className="text-sm text-muted-foreground">7xKX...gAsU</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">{t('settings.accounts.disconnect')}</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">{t('settings.profile.github')}</p>
                    <p className="text-sm text-muted-foreground">{t('settings.accounts.notConnected')}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">{t('settings.accounts.connect')}</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Google</p>
                    <p className="text-sm text-muted-foreground">{t('settings.accounts.notConnected')}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">{t('settings.accounts.connect')}</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">{t('settings.preferences.title')}</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="language">{t('settings.preferences.language')}</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('settings.preferences.languageDesc')}
                </p>
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                  <SelectTrigger id="language" className="focus-visible:ring-2 focus-visible:ring-[#14F195]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(languageInfo) as [Language, typeof languageInfo[Language]][]).map(([code, info]) => (
                      <SelectItem 
                        key={code} 
                        value={code}
                        className="focus-visible:ring-2 focus-visible:ring-[#14F195]"
                      >
                        {info.flag} {info.nativeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">{t('settings.preferences.theme')}</Label>
                <Select defaultValue="dark">
                  <SelectTrigger id="theme" className="focus-visible:ring-2 focus-visible:ring-[#14F195]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light" className="focus-visible:ring-2 focus-visible:ring-[#14F195]">
                      {t('settings.preferences.themeLight')}
                    </SelectItem>
                    <SelectItem value="dark" className="focus-visible:ring-2 focus-visible:ring-[#14F195]">
                      {t('settings.preferences.themeDark')}
                    </SelectItem>
                    <SelectItem value="system" className="focus-visible:ring-2 focus-visible:ring-[#14F195]">
                      {t('settings.preferences.themeSystem')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="dev-mode">{t('settings.preferences.devMode')}</Label>
                      <Code className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('settings.preferences.devModeDesc')}
                    </p>
                  </div>
                  <Switch
                    id="dev-mode"
                    checked={devMode}
                    onCheckedChange={setDevMode}
                    className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                  />
                </div>
                {devMode && (
                  <div className="mt-4 p-3 bg-muted/50 border border-[#14F195]/20 rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Code className="w-3 h-3 text-[#14F195]" />
                      Developer mode active: Hover over translated text to see translation keys
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <Button>{t('common.save')}</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">{t('settings.notifications.title')}</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">{t('settings.notifications.email')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notifications.emailDesc')}
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">{t('settings.notifications.push')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notifications.pushDesc')}
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                  className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="course-updates">{t('settings.notifications.courseUpdates')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notifications.courseUpdatesDesc')}
                  </p>
                </div>
                <Switch 
                  id="course-updates" 
                  defaultChecked 
                  className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievements">{t('settings.notifications.achievements')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notifications.achievementsDesc')}
                  </p>
                </div>
                <Switch 
                  id="achievements" 
                  defaultChecked 
                  className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button>{t('common.save')}</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">{t('settings.privacy.title')}</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-visibility">{t('settings.privacy.publicProfile')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.privacy.publicProfileDesc')}
                  </p>
                </div>
                <Switch 
                  id="profile-visibility" 
                  defaultChecked 
                  className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="leaderboard">{t('settings.privacy.leaderboard')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.privacy.leaderboardDesc')}
                  </p>
                </div>
                <Switch 
                  id="leaderboard" 
                  defaultChecked 
                  className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity">{t('settings.privacy.activity')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.privacy.activityDesc')}
                  </p>
                </div>
                <Switch 
                  id="activity" 
                  defaultChecked 
                  className="focus-visible:ring-2 focus-visible:ring-[#14F195] focus-visible:ring-offset-2"
                />
              </div>

              <div className="pt-6 border-t space-y-4">
                <h3 className="font-semibold">{t('settings.privacy.dataManagement')}</h3>
                <div className="space-y-2">
                  <Button variant="outline">{t('settings.privacy.downloadData')}</Button>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.privacy.downloadDataDesc')}
                  </p>
                </div>
                <div className="space-y-2">
                  <Button variant="destructive">{t('settings.privacy.deleteAccount')}</Button>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.privacy.deleteAccountDesc')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}