"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Recommendation {
  id: string
  title: string
  description: string
  priority: number
}

interface Task {
  id: string
  title: string
  due_date: string
  completed: boolean
}

interface ProgressData {
  reading: number
  listening: number
  writing: number
  speaking: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    
    const fetchData = async () => {
      console.log('Fetching dashboard data...')
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          console.error('Auth error:', authError)
          router.push('/auth')
          return
        }

        if (!user) {
          console.log('No authenticated user, redirecting...')
          router.push('/auth')
          return
        }

        console.log('User authenticated:', user.email)
        
        if (isMounted) {
          // Mock data since we don't have Supabase configured
          setProgress({
            reading: 45,
            listening: 60,
            writing: 30,
            speaking: 50
          })

          setRecommendations([
            {
              id: '1',
              title: 'Practice Past Tense',
              description: 'Complete 10 past tense exercises',
              priority: 1
            },
            {
              id: '2',
              title: 'Reading Comprehension',
              description: 'Read and answer questions about a short story',
              priority: 2
            }
          ])

          setUpcomingTasks([
            {
              id: '1',
              title: 'Vocabulary Quiz',
              due_date: new Date().toISOString(),
              completed: false
            }
          ])
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error in dashboard:', error)
          setError('Failed to load dashboard data')
          router.push('/auth')
        }
      } finally {
        if (isMounted) {
          console.log('Dashboard data loaded')
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      console.log('Cleaning up dashboard')
      isMounted = false
    }
  }, [])

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Your Learning Dashboard</h1>

      {error && (
        <div className="bg-destructive/15 p-4 rounded-md text-destructive">
          <p>{error}</p>
        </div>
      )}

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="animate-pulse bg-muted h-6 w-24 rounded" />
                <CardDescription className="animate-pulse bg-muted h-4 w-32 rounded" />
              </CardHeader>
              <CardContent>
                <Progress value={0} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">Loading...</p>
              </CardContent>
            </Card>
          ))
        ) : (
          Object.entries(progress || {
            reading: 0,
            listening: 0,
            writing: 0,
            speaking: 0
          }).map(([skill, value]) => (
          <Card key={skill}>
            <CardHeader>
              <CardTitle className="capitalize">{skill}</CardTitle>
              <CardDescription>Your current progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={value} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {value}% completed
              </p>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* Recommended Study Path */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Study Path</CardTitle>
          <CardDescription>Your personalized learning plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <Button variant="outline">Start</Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No recommendations available</p>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Your scheduled learning activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline">View</Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No upcoming tasks</p>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
