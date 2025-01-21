interface PageContainerProps {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-64px)]">
      {children}
    </div>
  )
} 