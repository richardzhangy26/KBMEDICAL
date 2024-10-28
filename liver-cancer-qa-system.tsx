'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [question, setQuestion] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the credentials against a backend
    // For this example, we'll just check if both fields are filled
    if (username && password) {
      setIsLoggedIn(true)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/placeholder.svg?height=1080&width=1920&text=')]" style={{backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>肝癌知识问答系统</CardTitle>
            <CardDescription>请登录以继续</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  用户名
                </label>
                <Input
                  id="username"
                  placeholder="输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  密码
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                登录
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">肝癌知识问答系统</h1>
      <Tabs defaultValue="qa" className="w-full">
        <TabsList className="w-full flex mb-4">
          <TabsTrigger value="qa" className="flex-1 py-2 px-4 text-lg font-semibold rounded-tl-lg rounded-tr-lg bg-white hover:bg-green-100 transition-colors">知识图谱问答</TabsTrigger>
          <TabsTrigger value="visualization" className="flex-1 py-2 px-4 text-lg font-semibold rounded-tl-lg rounded-tr-lg bg-white hover:bg-green-100 transition-colors">可视化展示</TabsTrigger>
        </TabsList>
        <TabsContent value="qa">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">知识图谱问答</CardTitle>
              <CardDescription>在这里提出您的问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">常见问题：</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuestion('肝癌如何治疗')}
                  >
                    肝癌如何治疗
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuestion('肺气肿能吃什么')}
                  >
                    肺气肿能吃什么
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuestion('肝癌的早期症状有哪些')}
                  >
                    肝癌的早期症状有哪些
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <Input 
                  placeholder="输入您的问题" 
                  className="border-2 border-green-300 focus:border-green-500 rounded-full py-2 px-4" 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  onClick={() => {
                    if (question) {
                      // 这里添加提交问题的逻辑
                      console.log('提交的问题:', question);
                      // 清空输入框
                      setQuestion('');
                    }
                  }}
                >
                  提交问题
                </Button>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                这里将显示问答结果
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visualization">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">可视化展示</CardTitle>
              <CardDescription>肝癌知识的可视化展示</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
                这里将展示知识图谱或其他可视化内容
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}