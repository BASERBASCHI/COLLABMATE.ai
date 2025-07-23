@@ .. @@
   // Show profile completion modal for incomplete profiles
   React.useEffect(() => {
-    if (userProfile && (!userProfile.isProfileComplete || userProfile.profileStrength < 60)) {
+    if (userProfile && (!userProfile.isProfileComplete || userProfile.profileStrength < 80)) {
       setShowProfileCompletion(true);
     }
   }, [userProfile]);