@@ .. @@
 interface StatsCardProps {
   title: string;
   value: string | number;
   icon: LucideIcon;
   color: 'indigo' | 'purple' | 'green';
+  subtitle?: string;
 }

-export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color }) => {
+export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, subtitle }) => {
   const colorClasses = {
     indigo: 'bg-indigo-50 text-indigo-800 border-indigo-100',
     purple: 'bg-purple-50 text-purple-800 border-purple-100',
@@ .. @@
       <div className="flex items-center justify-between">
         <div>
           <p className="text-sm font-medium">{title}</p>
+          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
           <p className="text-2xl font-bold mt-1">{value}</p>
         </div>
         <div className={`${iconColorClasses[color]} rounded-full p-3`}>
           <Icon className="h-6 w-6" />
         </div>
       </div>
     </div>
   );
 };