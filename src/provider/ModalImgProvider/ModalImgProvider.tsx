"use client";
import "react-image-lightbox/style.css";
import { ReactNode, createContext, useContext, useState } from "react";
import Lightbox from "react-image-lightbox";

interface ModalContextProps {
  /**
   * Opens the lightbox with a list of images
   * @param images      Array of image URLs
   * @param startIndex  Index of the image to show first (defaults to 0)
   */
  openImgModal: (images: ModalState["images"], startIndex?: number) => void;
  closeImgModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  images: [{ src: string; alt: string }];
  selectedIndex: number;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [key, setKey] = useState(0);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    images: [{ src: "", alt: "" }],
    selectedIndex: 0
  });

  const openImgModal = (images: ModalState["images"], startIndex: number = 0) => {
    setModalState({
      isOpen: true,
      images,
      selectedIndex: startIndex
    });
    document.body.style.overflow = "hidden";
  };

  const closeImgModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false
    }));
    document.body.style.overflow = "unset";
  };
  const { isOpen, images, selectedIndex } = modalState;
  const hasMultipleImages = images.length > 1;

  return (
    <ModalContext.Provider value={{ openImgModal, closeImgModal }}>
      {children}

      {isOpen && images.length > 0 && (
        <Lightbox
          enableZoom={false}
          mainSrc={images[selectedIndex]?.src}
          onImageLoad={() => setKey((prev) => prev + 1)}
          nextSrc={hasMultipleImages ? images[(selectedIndex + 1) % images.length]?.src : undefined}
          prevSrc={hasMultipleImages ? images[(selectedIndex + images.length - 1) % images.length]?.src : undefined}
          onCloseRequest={closeImgModal}
          imageTitle={`${images[selectedIndex]?.alt} ${selectedIndex + 1 + "/" + images.length}`}
          onMoveNextRequest={() =>
            setModalState((prev) => ({
              ...prev,
              selectedIndex: (prev.selectedIndex + 1) % prev.images.length
            }))
          }
          onMovePrevRequest={() =>
            setModalState((prev) => ({
              ...prev,
              selectedIndex: (prev.selectedIndex + prev.images.length - 1) % prev.images.length
            }))
          }
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModalImage = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalImage must be used within a ModalImageLightboxProvider");
  }
  return context;
};
