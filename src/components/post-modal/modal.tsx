"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { closeModal } from "@/store/slices/modal.slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreatePostModal } from "./create-post";
import { SellProductModal } from "./sell-product";

export const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  const handleClose = () => dispatch(closeModal());

  const renderModalContent = () => {
    switch (modalType) {
      case "CREATE_POST":
        return <CreatePostModal {...modalProps} />;
      case "SELL_PRODUCT":
        return <SellProductModal {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modalType === "CREATE_POST"
              ? "Create a New Post"
              : "Sell a Product"}
          </DialogTitle>
        </DialogHeader>
        {renderModalContent()}
      </DialogContent>
    </Dialog>
  );
};
