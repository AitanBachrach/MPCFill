/**
 * If the user clicks a card in the project editor, this component will be displayed,
 * which is a modal that shows a higher-resolution version of the card,
 * some more information (e.g. size, dote uploaded, etc.), and a direct download link.
 */

import { saveAs } from "file-saver";
import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { imageSizeToMBString } from "@/common/utils";

interface CardDetailedViewProps {
  imageIdentifier: string;
  show: boolean;
  handleClose: {
    (): void;
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  };
}

export function CardDetailedView(props: CardDetailedViewProps) {
  // ensure that the medium thumbnail fades in each time the selected image changes
  const [mediumThumbnailLoading, setMediumThumbnailLoading] = useState(true);
  useEffect(() => setMediumThumbnailLoading(true), [props.imageIdentifier]);

  const maybeCardDocument = useSelector(
    (state: RootState) =>
      state.cardDocuments.cardDocuments[props.imageIdentifier]
  );
  const maybeSourceDocuments = useSelector(
    (state: RootState) => state.sourceDocuments.sourceDocuments
  );

  return (
    <div>
      {maybeCardDocument != null && (
        <Modal
          show={props.show}
          onHide={props.handleClose}
          size={"xl"}
          data-testid="detailed-view"
        >
          <Modal.Header closeButton>
            <Modal.Title>Card Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <div
                className="col-lg-5 mb-3 mb-lg-0"
                style={{ position: "relative" }}
              >
                <div
                  className="rounded-xl shadow-lg ratio ratio-7x5"
                  style={{ zIndex: 0 }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      opacity: mediumThumbnailLoading ? 1 : 0,
                    }}
                  >
                    <div
                      className="spinner-border"
                      style={{ width: 4 + "em", height: 4 + "em" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>

                  <Image
                    alt={maybeCardDocument.name}
                    className="card-img-fade-in"
                    style={{
                      zIndex: 1,
                      opacity: mediumThumbnailLoading ? 0 : 1,
                    }}
                    src={maybeCardDocument.medium_thumbnail_url}
                    onLoad={() => setMediumThumbnailLoading(false)}
                    fill={true}
                    // onError={{thumbnail_404(this)}}
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <h4>{maybeCardDocument.name}</h4>
                <Table hover>
                  <tbody>
                    <tr>
                      <td>
                        <b>Source Name</b>
                      </td>
                      <td>
                        {maybeSourceDocuments != null &&
                        maybeSourceDocuments[maybeCardDocument.source_id]
                          .external_link != null ? (
                          <a
                            href={
                              maybeSourceDocuments[maybeCardDocument.source_id]
                                .external_link
                            }
                            target="_blank"
                          >
                            {maybeCardDocument.source_name}
                          </a>
                        ) : (
                          <a>{maybeCardDocument.source_name}</a>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Source Type</b>
                      </td>
                      <td>{maybeCardDocument.source_type}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Class</b>
                      </td>
                      <td>
                        {maybeCardDocument.card_type.charAt(0).toUpperCase() +
                          maybeCardDocument.card_type.slice(1).toLowerCase()}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Identifier</b>
                      </td>
                      <td>
                        <code>{maybeCardDocument.identifier}</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Resolution</b>
                      </td>
                      <td>{maybeCardDocument.dpi} DPI</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Date Created</b>
                      </td>
                      <td>{maybeCardDocument.date}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>File Size</b>
                      </td>
                      <td>{imageSizeToMBString(maybeCardDocument.size, 2)}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-grid gap-0">
                  <Button
                    variant="primary"
                    onClick={() =>
                      // TODO: setting the filename like this doesn't work for google drive links :(
                      saveAs(
                        maybeCardDocument.download_link,
                        `${maybeCardDocument.name} (${maybeCardDocument.identifier}).${maybeCardDocument.extension}`
                      )
                    }
                  >
                    Download Image
                  </Button>
                </div>
              </div>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export const MemoizedCardDetailedView = memo(CardDetailedView);
