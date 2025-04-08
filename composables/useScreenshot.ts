import html2canvas from 'html2canvas-pro'

export const useScreenshot = () => {
  const takeScreenshot = async (element: HTMLElement) => {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
      })
      return canvas
    } catch (error) {
      console.error('Failed to take screenshot:', error)
      return null
    }
  }

  const openPreview = async (element: HTMLElement) => {
    const canvas = await takeScreenshot(element)
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png')
      window.open(dataUrl, '_blank')
    }
  }

  const downloadImage = async (element: HTMLElement, filename: string) => {
    const canvas = await takeScreenshot(element)
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return {
    takeScreenshot,
    openPreview,
    downloadImage
  }
} 